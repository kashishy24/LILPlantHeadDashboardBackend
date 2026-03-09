const express = require("express");
const router = express.Router();
const { sql } = require("../../database/db");

// Get Machine Performance Dashboard

router.get("/machine-performance", async (req, res) => {

    const filterType = req.query.filterType || "Current";

    try {

        const pool = await sql.connect();   // ✅ create connection

        const result = await pool.request()
            .input("FilterType", sql.VarChar, filterType)
            .execute("Dashboard2_Get_MachinePerformance");

        res.json(result.recordset);

    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }

});


//get Prod Date
router.get("/GetProdDate", async (req, res) => {
  try {
    const request = new sql.Request();
    const result = await request.query(
      "SELECT * FROM Prod_ShiftInformation"
    );

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.json(result.recordset);  // ✅ return all rows
  } catch (err) {
    console.error("Error in GET ProDate", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;