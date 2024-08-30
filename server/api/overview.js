import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  const embed_code = "46bb4fb08f14ac1497715cd2"
  const secret_key = "2dbc4a9a5f85edfe2b4111cfb023411ec85ca3257ac2038f74abc5b654936fd22763fefed5ecda9d7ec0876c5bef6d0e24b7a2176d378f1a182fe8394d0fac4f"
  const expired_time = Math.floor(Date.now() / 1000) + (24 * 60 * 60 * 1000)

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
  const token = jwt.sign(payload, secret_key);

  return {
    embed_code,
    token
  }
})