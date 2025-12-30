const {Customer} = require("../models");

exports.createCustomer = async(req,res)=>{
    try{
        const{
            customerName,
            customerEmail,
            customerPhone,
            customerAddress,
            planManagerName,
            planManagerEmail,
            planManagerPhone,
            emailRecipient1,
            emailRecipient2,
            emailRecipient3,
        } = req.body;

        if(!customerName || !customerEmail || !customerAddress){
            return res.status(400).json({message:"Missing required fields"});
        }

        const newCustomer = await Customer.create({
            customerName,
            customerEmail,
            customerPhone,
            customerAddress,
            planManagerName,
            planManagerEmail,
            planManagerPhone,
            emailRecipient1,
            emailRecipient2,
            emailRecipient3
        });

        res.status(201).json({
            message: "Customer created successfully",
            customer: newCustomer
        });
    } catch (error) {
        console.error("Create customer error:", error);
        res.status(500).json({
            message: "Failed to create customer",
            error: error.message
        });
    }
}

exports.getAllCustomers = async (req, res) => {
        const customers = await Customer.findAll();
        res.json(customers);
    };

exports.getCustomerById = async (req, res) => {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
    }
    res.json(customer);
};

exports.updateCustomer = async (req, res) => {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
    }

    const {
        customerName,
        customerEmail,
        customerPhone,
        customerAddress,
        planManagerName,
        planManagerEmail,
        planManagerPhone,
        emailRecipient1,
        emailRecipient2,
        emailRecipient3,
    } = req.body;

    await customer.update({
        customerName,
        customerEmail,
        customerPhone,
        customerAddress,
        planManagerName,
        planManagerEmail,
        planManagerPhone,
        emailRecipient1,
        emailRecipient2,
        emailRecipient3,
    });

    res.json({
        message: "Customer updated successfully",
        customer,
    });
};

exports.deleteCustomer = async (req, res) => {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
    }

    await customer.destroy();

    res.json({
        message: "Customer deleted successfully",
        customer,
    });
}   



