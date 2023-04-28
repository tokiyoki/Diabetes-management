const model = {};

model.table = 'tasks';
model.mutableFields = ['taskTime', 'tasks.formID', 'description', 'tasks.userID', 'isCompleted', 'tasks.name'];
model.idField = 'taskID';

model.buildReadQuery = (id, id2, variant) => {
  const resolvedTable = '( tasks LEFT JOIN forms ON tasks.formID=forms.formID )';
  const resolvedFields = [model.idField, ...model.mutableFields, 'forms.name AS formName'];

  let sql = '';
  switch (variant) {
    case "usersall":
      sql = `SELECT ${resolvedFields} FROM ${resolvedTable}`;
      if (id) sql += ` WHERE tasks.userID=:ID`;
      break;
    case "usersnotcompleted":
      sql = `SELECT ${resolvedFields} FROM ${resolvedTable}`;
      if (id) sql += ` WHERE tasks.userID=:ID AND tasks.isCompleted = false`;
      break;
    default:
      sql = `SELECT ${resolvedFields} FROM ${resolvedTable}`;
      if (id) sql += ` WHERE tasks.taskID=:ID`;
  }

  return { sql, data: { ID: id, ID2: id2 } };
};

export default model;