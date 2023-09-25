import db from '../../../Database/sql/db.js';

export const postTodoModel = async (title, description, author,status, date, org_id) => {
  let text = `INSERT INTO todos(title, description, author,status,date, org_id)
              VALUES ($1, $2, $3, $4,$5,$6)`;
  let values = [title, description, author,status,date, org_id];

  await db.query(text, values);

  return;
};

export const getTodosModel = async (org_id) => {
  let text = `SELECT * FROM todos WHERE org_id=$1`;
  let values = [org_id];

  let queryResult = await db.query(text, values);

  return queryResult.rows;
};

export const putTodoModel = async (title, description, author,status,date, todo_id) => {
  let text = `UPDATE todos SET title= $1, description=$2, author=$3 , status=$4 , date=$5
              WHERE id = $6`;
  let values = [title, description, author,status,date, todo_id];

  await db.query(text, values);

  return;
};

export const deleteTodoModel = async (todo_id) => {
  let text = `DELETE FROM todos 
              WHERE id=$1`;
  let values = [todo_id];

  await db.query(text, values);
  return;
};

export const completeTodoModel = async (todo_id) => {
  let text = `UPDATE todos 
              SET status = 'complete' 
              WHERE id=$1`;
  let values = [todo_id];

  await db.query(text, values);
  return;
};