import express from "express"

const router = express.router()

router.get('/excel', getDataExcel);

export default router