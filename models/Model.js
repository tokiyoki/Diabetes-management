class Model {

    constructor(model) {
      this.table = model.table;
      this.mutableFields = model.mutableFields;
      this.idField = model.idField;
      this.idField2 = model.idField2;
      this.buildReadQuery = model.buildReadQuery;
    }
  
    // Methods
  
    buildSetFields = (fields, record, isCreate = true) => fields.reduce((setSQL, field, index) => //{
        setSQL + ((isCreate || record[field.slice(field.indexOf(".") + 1)]) ?  ((setSQL === "" || setSQL === "SET ") ? '' : ', ') + `${field}=:${field.slice(field.indexOf(".") + 1)}` : "" ), 'SET '
        /*if(isCreate) {
          setSQL + `${field}=:${field.slice(field.indexOf(".") + 1)}` + ((index === fields.length - 1) ? '' : ', '), 'SET '
        }
      }*/
    );
  
    buildCreateQuery = (record) => {
      const sql = `INSERT INTO ${this.table} ` + this.buildSetFields(this.mutableFields);
      console.log(sql);
      return { sql, data: record };
    };
  
    buildUpdateQuery = (record, id, id2) => {
      const sql = `UPDATE ${this.table} ` + this.buildSetFields(this.mutableFields, record, false) + ` WHERE ${this.idField}=:ID` + (id2 ? ` AND ${this.idField2}=:ID2` : "");
      console.log(sql);
      return { sql, data: { ...record, ID: id, ID2: id2 } };
    };
  
    buildDeleteQuery = (id, id2) => {
      const sql = `DELETE FROM ${this.table} WHERE ${this.idField}=:ID` + (id2 ? ` AND ${this.idField2}=:ID2` : "");
      return { sql, data: { ID: id, ID2: id2 } };
    };
  
  }
  
  export default Model;