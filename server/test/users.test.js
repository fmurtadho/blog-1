// const chai = require('chai')
// const chaiHttp = require('chai-http')

// const User = require('../models/users')
// const app = require('../app')

// var expect = require('chai').expect;

// chai.use(chaiHttp)


// describe('User',function(){

//     this.afterAll('Remove dummy article and user from database', function (done) {
//         User.deleteOne({
//             email : 'test@mail.com'
//         })
//         .then(()=>{
//             done()
//         })
//         .catch((err)=>{
            
//         })
//     })

//     describe('POST /users/register',function(){
//         it('Input name and email length is less than 4 | should return 422 minimum name & password length is 4',function(done){
//             chai
//             .request(app)
//             .post('/users/signup')
//             .send({
//                 name : 'asd',
//                 email : 'asd',
//                 password : 'asdfasdf'
//             })
//             .end((err,res)=>{
//                 expect(res.body).to.have.property('message')
//                 expect(res.body.message).to.equal('Minimum name & password length is 4')
//                 expect(res).to.have.status(422)
//                 done()
//             })
//         })

//         it('Input email format is wrong | should return 422 invalid email format',function(done){
//             chai
//             .request(app)
//             .post('/users/signup')
//             .send({
//                 name : 'asdfasdf',
//                 email : 'asdfasdf',
//                 password : 'asdfasdf'
//             })
//             .end((err,res)=>{
//                 expect(res).to.have.status(422)
//                 expect(res.body).to.have.property('message')
//                 expect(res.body.message).to.equal('Invalid email format')
//                 done()
//             })
//         })

//         it('Valid input name,email and password | should return 201 signup success',function(done){
//             chai
//             .request(app)
//             .post('/users/signup')
//             .send({
//                 name : 'test',
//                 email : 'test@mail.com',
//                 password : 'testtest'
//             })
//             .end((err,res)=>{
//                 expect(res).to.have.status(201)
//                 expect(res.body).to.have.property('message')
//                 expect(res.body.message).to.equal('signup success')
//                 expect(res.body).to.have.property('user')
//                 expect(res.body.user).to.have.property('name')
//                 expect(res.body.user).to.have.property('email')
//                 expect(res.body.user).to.have.property('password')
//                 expect(res.body.user.name).to.equal('test')
//                 expect(res.body.user.email).to.equal('test@mail.com')
//                 done()
//             })
//         })
//     })

//     describe('POST /users/signin',function(){
//         it('Valid input email but wrong password | should return 500 invalid password',function(done){
//             chai
//             .request(app)
//             .post('/users/signin')
//             .send({
//                 email : "test@mail.com",
//                 password : "zzzz"
//             })
//             .end((err,res)=>{
//                 expect(res).to.have.status(500)
//                 expect(res.body).to.have.property('message')
//                 expect(res.body.message).to.equal('Invalid password')
//                 done()
//             })
//         })
        
//         it('Empty input email and password | should return 500 Invalid Email / Password',function(done){
//             chai
//             .request(app)
//             .post('/users/signin')
//             .send({
//                 email : "",
//                 password : ""
//             })
//             .end((err,res)=>{
//                 expect(res).to.have.status(500)
//                 expect(res.body).to.have.property('message')
//                 expect(res.body.message).to.equal('Invalid email')
//                 done()
//             })
//         })

//         it('Valid Input Email And Password | should return 200 and access token',function(done){
//             chai
//             .request(app)
//             .post('/users/signin')
//             .send({
//                 email : "test@mail.com",
//                 password : "testtest"
//             })
//             .end((err,res)=>{
//                 expect(res).to.have.status(200)
//                 expect(res.body).to.have.property('userId')
//                 expect(res.body).to.have.property('name')
//                 expect(res.body.name).to.equal('test')
//                 expect(res.body.email).to.equal('test@mail.com')
//                 expect(res.body).to.have.property('token')
//                 done()
//             })
//         })
//     })
// })