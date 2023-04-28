const model = {};

model.table = 'users';
model.mutableFields = ['users.type'];
model.idField = 'userID';

model.buildReadQuery = (id, id2, variant) => {
  const resolvedTable = '( users )';
  const resolvedFields = [model.idField, ...model.mutableFields];

  let sql = '';
  switch (variant) {
    default:
      sql = `SELECT ${resolvedFields} FROM ${resolvedTable}`;
      if (id) sql += ` WHERE users.userID=:ID`;
  }

  return { sql, data: { ID: id, ID2: id2 } };
};

export default model;