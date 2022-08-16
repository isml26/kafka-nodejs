const express = require("express");
const { sendMessage, getMessages } = require("../controller/messageConroller");
const logRequest = require("../middlewares/logRequest");

const router = express.Router();

/**
 * @swagger
 * definitions:
 *  person_message:
 *   type: object
 *   properties:
 *    id:
 *     type: string
 *     description: id of person
 *     example: '1'
 *    message:
 *     type: string
 *     description: message of person
 *     example: 'this is test message'
*/
/**
 * @swagger
 * /message:
 *  post:
 *   summary: send message
 *   description: produce message to kafka
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/person_message'
 *   responses:
 *    201:
 *     description: employee created succesfully
 *    400:
 *     description: failure in creating employee
 */

/**
 * @swagger
 * /message:
 *  get:
 *   summary: get all messages
 *   description: get all messages
 *   responses:
 *    200:
 *     description: success
 *    400:
 *     description: error
 */

router.post("/", logRequest, sendMessage);

router.get("/", logRequest, getMessages);

module.exports = router;
