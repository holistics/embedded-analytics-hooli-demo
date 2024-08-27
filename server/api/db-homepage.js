// server/api/generate-iframe-token.js
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  const embed_code = "b04a495124f0e57983ea418a"
  const secret_key = "fd5484161859ff014a95e9758ef688e661c6880be9d83d7f5d5b10cb405e27e6b15e9928baff4387521f63a34d7e3a036d6b26247e894141c0bc69cf3a7e3969"

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