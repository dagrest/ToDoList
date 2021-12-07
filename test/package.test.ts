import * as getPort from 'get-port';
import got from 'got';
import { Server } from 'http';
import { createApp } from '../src/app';

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
    console.log('DEBUG!!!')

    // http://localhost:3000/list/TodoList

    const res: any = await got.post(
      `http://localhost:3000/additem/ToDoList/First ToDo Item`,
    ).json();

    // const res: any = await got(
    //   `http://localhost:${port}/additem/${listNameParam}/${itemNameParam}`,
    // ).json();



    console.log('Result:'  + res);

    expect(res).toEqual('{"TodoList":[{"itemId":"be22423b-6bc3-4dd5-8773-2670602cff0b","itemName":"First ToDo Item","itemStatus":"active"}]}');
  });

});
