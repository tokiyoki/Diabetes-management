const model = {};

model.table = 'forms';
model.mutableFields = ['name', 'forms.userID'];
model.idField = 'formID';

model.buildReadQuery = (id, id2, variant) => {
  const resolvedTable = '( forms )';
  const resolvedFields = [model.idField, ...model.mutableFields];

  let sql = '';
  switch (variant) {
    case "userforms":
      sql = `SELECT ${resolvedFields} FROM ${resolvedTable}`;
      if (id) sql += ` WHERE forms.userID=:ID`;
      break;
    default:
      sql = `SELECT ${resolvedFields} FROM ${resolvedTable}`;
      if (id) sql += ` WHERE forms.formID=:ID`;
  }

  return { sql, data: { ID: id, ID2: id2 } };
};

export default model;