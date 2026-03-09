const express = require("express");
const router = express.Router();
const { sql } = require("../../database/db");

// PM Summary - Current Year

router.get("/pm-summary-current-year", async (req, res) => {

  try {

    const pool = await sql.connect();

    const result = await pool.request()
      .execute("Dashboard2_PM_Summary_CurrentYear");

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }

    res.json(result.recordset);

  } catch (err) {

    console.error("Error in PM Summary API:", err);
    res.status(500).json({ message: "Server error" });

  }

});


router.get("/hc-summary-current-year", async (req, res) => {

  try {

    const pool = await sql.connect();

    const result = await pool.request()
      .execute("Dashboard2_HC_Summary_CurrentYear");

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }

    res.json(result.recordset);

  } catch (err) {

    console.error("Error in HC Summary API:", err);
    res.status(500).json({ message: "Server error" });

  }

});
module.exports = router;