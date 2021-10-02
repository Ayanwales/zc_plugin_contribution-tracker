// Custom Modules
import Response from '../utils/response'
const CustomError = require("../utils/custom-error");
const { DATABASE_CONFIG } = require("../config/index");
const { PLUGIN_ID } = require("../config/index");
const voterSchema = require("../models/voter.model");
const ZuriDatabase = require("../zuricore/db");

const Voter = new ZuriDatabase("ct_voters");

class AdminController {

  async addVoter (req, res, next) {
    try {

      const { first_name, last_name,  email, voting_weight } = req.body;
      const { org_id } = req.query;

      const voter  = await voterSchema.validateAsync({
        first_name,
        last_name,
        email,
        voting_weight,
      }).catch((e)=>{
        Response.send(
          res,
          422,
          e,
          "validation failed"
        )
      });

      // Save the voter to the database
      const newVoterDBData = await Voter.create(voter, org_id);


      return Response.send(
        res,
        200,
        newVoterDBData,
        "Voter added successfully"
      )
    } catch (error) {
       next(error)
    }
  }


  async updateVoter (req, res, next) {
    try {

      const { voting_weight } = req.body;
      const { org_id, voter_id } = req.query;

      const voter  = {
        voting_weight: voting_weight
      };

      // Save the voter to the database
      const newVoterDBData = await Voter.update(voter_id, voter, org_id);


      return Response.send(
        res,
        200,
        newVoterDBData,
        "Voter added successfully"
      )
    } catch (error) {
       next(error)
    }
  }



  async getVoters (req, res, next) {
    try {
      const { org_id } = req.query;
      const voters = await Voter.fetchAll(org_id);
      Response.send(
        res,
        200,
        voters,
        "Voters retrieved successfully"
      )
    } catch (error) {
      next(error);
    }
  }

  async removeVoter (req, res, next) {
    try {
      const { org_id } = req.query;
      const { email } = req.query;
      const response = await Voter.delete({email: email}, org_id,);
      Response.send(
        res,
        200,
        response,
        "Voter deleted successfully"
      )
    } catch (error) {
      next(error);
    }
  }
}

// Export Module
module.exports = new AdminController();