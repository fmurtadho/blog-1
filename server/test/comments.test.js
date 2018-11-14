const chai = require('chai');
const chaiHttp = require('chai-http');
const Article = require('../models/articles')
const User = require('../models/users')
const app = require('../app')

const expect = chai.expect;

chai.use(chaiHttp);

describe('Article', function () {

    let token = ''
    let id = ''
    let articleId = ''

    this.beforeAll('Add dummy user & article to database', function (done) {
       
        chai.request(app)
            .post('/users/signup')
            .send({
                name: 'Test Comment',
                email: 'testcomment@mail.com',
                password: 'testcomment'
            })
            .end((err, res) => {
                
                chai
                .request(app)
                .post('/users/signin')
                .send({
                    email: 'testcomment@mail.com',
                    password: 'testcomment'
                })
                .end((err, res) => {
                    token = res.body.token

                    chai
                    .request(app)
                    .post('/articles/create')
                    .set({
                        token : token
                    })
                    .send({
                        title: 'Test Comment',
                        content: 'Lorem ipsum',
                        picture : 'http://placehold.it/750x300',
                        category : '5bc67a21af597e22f8484d81'
                    })
                    .end((err,res)=>{
                        articleId = res.body.created._id
                        done()
                    })
                })
            })
    })
    
    this.afterAll('Remove dummy article and user from database', function (done) {
        Article.deleteOne({
            _id: articleId
        })
        .then((done) => {
            console.log(done)
            User.deleteOne({
                email: 'testcomment@mail.com'
            })
            .then(() => {
                done()
            })
        })
    })

    describe('POST /comments/:articleId',function(){
        it('valid input | should post comment to specified article',function(done){
            chai
            .request(app)
            .post(`/comments/${articleId}`)
            .set({
                token : token
            })
            .send({
                thecomment : "Lorem Ipsum"
            })
            .end((err,res)=>{
                expect(res).to.have.status(201)
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property('_id')
                expect(res.body).to.have.property('thecomment')
                expect(res.body.thecomment).to.equal('Lorem Ipsum')
                expect(res.body).to.have.property('user')
                done()
            })
        })
    })


}); //END TEST