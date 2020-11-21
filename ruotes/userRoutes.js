const express = require('express');
const router = express.Router();

const API = require('../model/api');
const badRequestErrorModule = require('./error/BadRequestError');
const relatedResourceNotFoundErrorModule = require('./error/RelatedResourceNotFoundError');
const internalServerErrorModule = require('./error/InternalServerError');
const system = require('../backend/mockBBDD');

router.get('/', (req, res, next) => {
    res.status(200).json("ok");
});


router.post('/notify', (req, res, next) => {
    const c1 = Object.keys(req.body).length === 3
    const c2 = req.body.subject  !== undefined
    const c3 = req.body.message  !== undefined
    const c4 = req.body.receptor !== undefined
    if(c1 && c2 && c3 && c4){
        const m = system.notify(req.body.receptor, req.body.subject, req.body.message); 
        res.status(200).json({message: m})
        
    }
	else{
        next(new badRequestErrorModule.BadRequestError())
    }
});

module.exports = router;
