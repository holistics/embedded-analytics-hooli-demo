import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  const embed_code = "b5ea47e4c72c165d69553b65"
  const secret_key = "6180d5358273f109529e83d33762dc7916676dea829971c81c31f82908cb77c1796f944ffc731888d2be8cb8113290bd92d0b103ea3a03d301873cf6281088a2"
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