class Controller {

    constructor(accessor) {
      this.accessor = accessor;
    }
  
    // Methods
    
    get = async (req, res, variant) => {
      const id = req.params.id;
      const id2 = req.params.id2;
  
      // Validate request
  
      // Access data
      const { isSuccess, result, message: accessorMessage } = await this.accessor.read(id, id2, variant);
      if (!isSuccess) return res.status(404).json({ message: accessorMessage });
      
      // Response to request
      res.status(200).json(result);
    };
  
    post = async (req, res) => {
      const record = req.body;
      
      // Validate request
  
      // Access data
      const { isSuccess, result, message: accessorMessage } = await this.accessor.create(record);
      if (!isSuccess) return res.status(400).json({ message: accessorMessage });
      
      // Response to request
      res.status(201).json(result);
    };
  
    put = async (req, res) => {
      const id = req.params.id;
      const id2 = req.params.id2;
      const record = req.body;
  
      // Validate request
  
      // Access data
      const { isSuccess, result, message: accessorMessage } = await this.accessor.update(record, id, id2);
      if (!isSuccess) return res.status(400).json({ message: accessorMessage });
      
      // Response to request
      res.status(200).json(result);
    };
  
    delete = async (req, res) => {
      const id = req.params.id;
      const id2 = req.params.id2;
  
      // Validate request
  
      // Access data
      
      const { isSuccess, result, message: accessorMessage } = await this.accessor.delete(id, id2);
      if (!isSuccess) return res.status(400).json({ message: accessorMessage });
      
      // Response to request
      res.status(204).json({ message: accessorMessage });
    };
  
  }
  
  export default Controller;