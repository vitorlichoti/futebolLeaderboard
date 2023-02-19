import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

import { myMockToken, mockTeams } from './mocks/fakeData';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de integração em toda a aplicação', () => {
  describe('Testes no endpoint /login', () => {

    describe('POST com sucesso endpoint "/"', () => {
      var tokenGenerated:string;
      it('POST correto deverá retornar status 200 e um token', async () => {
        const { status, body } = await chai.request(app).post('/login').send({
          email: "admin@admin.com",
          password: "secret_admin"
        });

        tokenGenerated = body.token;
    
        expect(status).to.be.equal(200);
        expect(body).to.haveOwnProperty('token');
        expect(body).to.be.string;
      });
    });

    describe('POST com erro endpoint "/"', () => {

      it('POST incorreto deverá retornar status 401 e uma mensagem', async () => {
        const { status, body } = await chai.request(app).post('/login').send({
          email: "admin@admin.com",
          password: "incorrectpassword"
        });
    
        expect(status).to.be.equal(401);
        expect(body.message).to.be.equal('Incorrect email or password');
      });  
    });

    describe('GET com sucesso endpoint "/validate"', () => {

      it('GET com token valido deverá retornar status 200 e a role', async () => {
        const response = await chai.request(app).post('/login').send({
          email: "admin@admin.com",
          password: "secret_admin"
        });
        
        
        const { status, body } = await chai.request(app)
        .get('/login/validate')
        .set({ 'Authorization': response.body.token });

        expect(status).to.be.equal(200);
        expect(body).to.be.deep.equal({ role: 'admin' });
      });
    });

    describe('GET com erro endpoint "/"', () => {

      it('GET sem token valido deverá retornar status 401 e uma mensagem', async () => {
        const { status, body } = await chai.request(app).get('/login/validate');
        
        expect(status).to.be.equal(401);
        expect(body).to.be.equal('Unauthorized');
      });
    });
  });

  describe('Testes no endpoint /teams', () => {

    describe('GET com sucesso endpoint "/"', () => {

      it('GET correto deverá retornar status 200 e um array de times', async () => {
        const { status, body } = await chai.request(app).get('/teams');
        
        expect(status).to.be.equal(200);
        expect(body).to.be.instanceOf(Array);
        expect(body).to.be.deep.equal(mockTeams);
      });
    });

    describe('GET com sucesso endpoint "/:id"', () => {

      it('GET passando id do time deverá retornar status 200 e um objeto contendo o time', async () => {
        const { status, body } = await chai.request(app).get('/teams/1');
        
        expect(status).to.be.equal(200);
        expect(body).to.be.deep.equal(mockTeams[0]);
      });
    });

    describe('GET com erro endpoint "/:id"', () => {

      it('GET passando id do time incorreto deverá retornar status 404 e uma mensagem Not Found', async () => {
        const { status, body } = await chai.request(app).get('/teams/100');
        
        expect(status).to.be.equal(404);
        expect(body).to.be.equal('Not found');
      });
    });
  });

  describe('Testes no endpoint /matches', () => {

    describe('GET endpoint "/"', () => {

      it('GET correto deverá retornar status 200 e uma lista de partidas', async () => {
        const { status, body } = await chai.request(app).get('/matches');
        
        expect(status).to.be.equal(200);
        expect(body).to.be.instanceOf(Array);
      });
    });

    describe('GET endpoint "?inProgress=true"', () => {

      it('GET com filtro de partidas em andamento deverá retornar status 200 e lista de partidas em andamento', async () => {
        const { status, body } = await chai.request(app).get('/matches?inProgress=true');
      
        expect(status).to.be.equal(200);
        expect(body).to.be.instanceOf(Array);
      });
    });

    describe('PATCH endpoint "/:id/finish"', () => {

      it('/matches/:id/finish É possivel alterar o status inProgress de uma partida', async () => {
        const { status, body } = await chai.request(app).patch('/matches/2/finish');
        
        expect(status).to.be.equal(200);
        expect(body).to.be.equal('Finished');
      });
    });

    describe('PATCH endpoint "/:id"', () => {

      it('/matches/:id É possivel atualizar partidas em andamento', async () => {
        const { status, body } = await chai.request(app).patch('/matches/2').send({
          homeTeamGoals: 3,
          awayTeamGoals: 1
        });
        
        expect(status).to.be.equal(200);
        expect(body).to.be.equal('');
      });
    });

    describe('POST erro no endpoint "/"', () => {

      it('POST não é possível criar partida sem token validado', async () => {
        const { status, body } = await chai.request(app).post('/matches').send({
          homeTeamId: 16,
          awayTeamId: 8,
          homeTeamGoals: 2,
          awayTeamGoals: 2,
        });
      
        expect(status).to.be.equal(401);
        expect(body.message).to.be.equal('Token must be a valid token');
      });
    });
    
    describe('POST sucesso endpoint "/"', () => {

      it('POST passando um token válido é possivel criar uma partida', async () => {
        const response = await chai.request(app).post('/login').send({
          email: "admin@admin.com",
          password: "secret_admin"
        });      
        
        const { status, body } = await chai.request(app)
          .post('/matches')
          .set({ "Authorization": response.body.token })
          .send({
          homeTeamId: 16,
          awayTeamId: 8,
          homeTeamGoals: 2,
          awayTeamGoals: 2,
          });
        
        expect(status).to.be.equal(201);
        expect(body).to.haveOwnProperty('id');
        expect(body).to.haveOwnProperty('homeTeamId')
        expect(body).to.haveOwnProperty('awayTeamId')
        expect(body).to.haveOwnProperty('homeTeamGoals')
        expect(body).to.haveOwnProperty('awayTeamGoals')
        expect(body).to.haveOwnProperty('inProgress')
        });
    });
  });

  describe('Testes no endpoint /leaderboard', () => {

    describe('GET endpoint "/"', () => {

      it('GET com sucesso, deverá retornar status 200 e uma array de partidas', async () => {
        const { status, body } = await chai.request(app).get('/leaderboard');

        expect(status).to.be.equal(200);
        expect(body).to.be.instanceOf(Array);
      });
    });

    describe('GET endpoint "/home"', () => {

      it('GET com sucesso, deverá retornar status 200 e uma array de partidas home', async () => {
        const { status, body } = await chai.request(app).get('/leaderboard/home');

        expect(status).to.be.equal(200);
        expect(body).to.be.instanceOf(Array);
      });
    });

    describe('GET endpoint "/away"', () => {

      it('GET com sucesso, deverá retornar status 200 e uma array de partidas away', async () => {
        const { status, body } = await chai.request(app).get('/leaderboard/away');

        expect(status).to.be.equal(200);
        expect(body).to.be.instanceOf(Array);
      });
    });
  });
});


// import * as sinon from 'sinon';
// import * as chai from 'chai';
// // @ts-ignore
// import chaiHttp = require('chai-http');

// import { app } from '../app';
// import User from '../database/models/User';
// import fakeUser  from './mocks/fakeData';

// import { Response } from 'superagent';

// chai.use(chaiHttp);

// const { expect } = chai;

// describe('Testes de integração da Aplicação', function() {
  
//   describe('Testes da Seção 1: Users e Login', function() {
//     // beforeEach(() => {
//     //   sinon.stub(User.prototype, 'getByUserPassword').resolves(fakeUser);
//     //   // sinon.stub(Logger, 'save').resolves();
//     // });

//     // afterEach(() => {
//     //   (User.prototype.getByUserPassword as sinon.SinonStub).restore();
//     //   // (Logger.save as sinon.SinonStub).restore();
//     // });

//     test('POST no endpoint /login deve retornar um token', async function() {
//       const myMockToken = { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc' };
//       const { status, body } = await chai.request(app).post('/login').send({
//         username: 'teste',
//         password: '123456',
//       });

//       expect(status).to.be.equal(200);
//       expect(body).to.haveOwnProperty('token');
//       expect(body).to.be.deep.equal(myMockToken);
//     });
//   });
// });
