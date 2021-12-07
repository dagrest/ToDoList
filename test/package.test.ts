import * as getPort from 'get-port';
import got from 'got';
import { Server } from 'http';
import { createApp } from '../src/app';


const fs = require('fs')

describe('/additem/:listName/:itemName', () => {
  let server: Server;
  let port: number;

  beforeAll(async (done) => {
    port = await getPort();
    server = createApp().listen(port, done);
  });

  afterAll((done) => {
    server.close(done);
  });

  it('responds', async () => {
    const listNameParam = 'ToDoList';
    const itemNameParam = 'First ToDo Item';

    try {
      fs.unlinkSync('./' + listNameParam + '.json')
      //file removed
    } catch(err) {
      //nothing to do - file not exists/removed
    }

    const res: any = await got('http://localhost:3000/additem/' + listNameParam + '/' + itemNameParam, 
      { method: 'post' });

    var expectedRes = '{"TodoList":[{"itemId":"","itemName":"First ToDo Item","itemStatus":"active"}]}';

    var result = res.body.substring(0, 24) + res.body.substring(60, res.body.length);


    console.log('Result:'  + res);

    expect(result).toEqual(expectedRes);
  });

});
