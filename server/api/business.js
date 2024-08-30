// server/api/generate-iframe-token.js
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  const embed_code = "6a6b2fffd59fa11a4ceaa60b"
  const secret_key = "e781139269c25bea7cc1faaeb87ddb77ea2fa8331023267cffeb10761e2f33c30d448d48d148446fe256d5abb5298e12c4262c5ebfb977c2718624337721d3b4"
// Will expire after 1 day, change it to the value you want
const expired_time = Math.floor(Date.now() / 1000) + (24 * 60 * 60 * 1000);
const settings = {
  "enable_export_data": false,
  "default_timezone": null,
  "allow_to_change_timezone": false
};

const permissions = {
  "row_based": []
};

const filters = {};


const payload = {
  settings: settings,
  permissions: permissions,
  filters: filters,
  exp: expired_time
}
  const token = jwt.sign(payload, secret_key)

  return {
    embed_code,
    token
  }
})