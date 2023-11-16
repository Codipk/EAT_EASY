const MessCommittee = require('../models/messCommitteSchema');
//tempory things
exports.createCommittee = async (req, res) => {
  try {

    const committee = req.body;
    const committeeDetails = await MessCommittee.create(committee);
    return res.status(200).json({
      success: true,
      message: "committee created successfully",
      committeeDetails,
    })

  } catch (error) {
    console.log("Error in creating committee: ", error);
    return res.status(500).json({
      success: false,
      message: "cannnot create committee, please try again",
      error,
    })
  }
}