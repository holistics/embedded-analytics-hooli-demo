import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  const embed_code = "ba93db5151640b65f92b01b0"
  const secret_key = "fe8fc8fddfb031a8eecb12f317393cb92f154b82e080b6d00eb2ab4c97f9621becd297012e1b8688080e39755813012f85acd3261943c98b75e3bf7f5fa89962"
  
  const expired_time = Math.floor(Date.now() / 1000) + (24 * 60 * 60 * 1000)

  const settings = {
    "enable_export_data": false,
    "default_timezone": null,
    "allow_to_change_timezone": false
  };
  
  const permissions = {
    "row_based": []
  };
  
  const filters = {
    "f1": {
      "hidden": false,
      "default_condition": {
        "operator": "is",
        "values": [
          "youtube_blogger"
        ],
        "modifier": null
      }
    }
  };
  
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