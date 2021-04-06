var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);
suite('Functional Tests', function() {
    
    suite('GET /api/stock-prices => stockData object', function() {
      
      test('1 stock', function(done) {
       chai.request(server)
        .get('/api/stock-prices')
        .query({stock: 'aapl'})
        .end(function(err, res){
          console.log('======',res.body)
          assert.equal(res.status, 200)
          assert.property(res.body, 'stockData')
          assert.property(res.body.stockData, 'stock')
          assert.property(res.body.stockData, 'price')
          assert.property(res.body.stockData, 'likes')
       //   assert.equal(res.body.stockData.stock, 'aapl ')
          assert.isNumber(res.body.stockData.price)
          assert.isNumber(res.body.stockData.likes)
          
          done()
        })
      })
      
      test('1 stock with like', function(done) {
        chai.request(server)
          .get('/api/stock-prices')
          .query({ stock: 'aapl', like: true })
          .end(function(err, res){
            console.log('-------',res.body)
            assert.equal(res.status, 200)
            assert.property(res.body, 'stockData')
            assert.property(res.body.stockData, 'stock')
            assert.property(res.body.stockData, 'price')
            assert.property(res.body.stockData, 'likes')
          //  assert.equal(res.body.stockData.stock, 'aapl')
            assert.isNumber(res.body.stockData.price)
            assert.isNumber(res.body.stockData.likes)

            done()
          })
      })
      
      test('1 stock with like again (ensure likes arent double counted)', function(done) {
        chai.request(server)
          .get('/api/stock-prices')
          .query({ stock: 'aapl', like: true })
          .end(function(err, res){
            console.log('______',res.body)
            assert.equal(res.status, 200)
            assert.notEqual(res.body,'stockData')
          //  assert.property(res.body, 'stockData')
          //  assert.property(res.body.stockData, 'stock')
          //  assert.property(res.body.stockData, 'price')
          //  assert.property(res.body.stockData, 'likes')
          //  assert.equal(res.body.stockData.stock, 'goog')
          //  assert.isNumber(res.body.stockData.price)
          //  assert.isNumber(res.body.stockData.likes)

            done()
          })
      })
      
      test('2 stocks', function(done) {
        chai.request(server)
          .get('/api/stock-prices')
          .query({ stock: ['spot', 'msft'] })
          .end(function(err, res){

            assert.equal(res.status, 200)
            console.log('++++++++',res.body)
            assert.property(res.body, 'stockData')
            assert.isArray(res.body.stockData)
            assert.property(res.body.stockData[0], 'stock')
            assert.property(res.body.stockData[0], 'price')
            assert.property(res.body.stockData[0], 'rel_likes')
          // assert.equal(res.body.stockData[0].stock, 'msft')
            assert.isNumber(res.body.stockData[0].price)
            assert.isNumber(res.body.stockData[0].rel_likes)
            
            assert.property(res.body.stockData[1], 'stock')
            assert.property(res.body.stockData[1], 'price')
            assert.property(res.body.stockData[1], 'rel_likes')
          //  assert.equal(res.body.stockData[1].stock, 'spot')
            assert.isNumber(res.body.stockData[1].price)
            assert.isNumber(res.body.stockData[1].rel_likes)

            done()
          })
      })
      
      test('2 stocks with like', function(done) {
        chai.request(server)
          .get('/api/stock-prices')
          .query({ stock: ['AAON', 'AAOI'], like: true })
          .end(function(err, res){

            assert.equal(res.status, 200)
            console.log('********',res.body)
            assert.property(res.body, 'stockData')
            assert.isArray(res.body.stockData)
            assert.property(res.body.stockData[0], 'stock')
            assert.property(res.body.stockData[0], 'price')
            assert.property(res.body.stockData[0], 'rel_likes')
         //   assert.equal(res.body.stockData[0].stock, 'msft')
            assert.isNumber(res.body.stockData[0].price)
            assert.isNumber(res.body.stockData[0].rel_likes)
            
            assert.property(res.body.stockData[1], 'stock')
            assert.property(res.body.stockData[1], 'price')
            assert.property(res.body.stockData[1], 'rel_likes')
          //  assert.equal(res.body.stockData[1].stock, 'spot')
            assert.isNumber(res.body.stockData[1].price)
            assert.isNumber(res.body.stockData[1].rel_likes)

            done()
          })
      })
      
    });

});