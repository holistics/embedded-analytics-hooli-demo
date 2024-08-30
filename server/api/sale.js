import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  const embed_code = "69bf7c07e7d6a0cc619e231b"
  const secret_key = "0c31cc7817c7ab6f8d8074bcb39023cc9fd605d6c9f975ad8843ee85cd362d77af7e8f07aeb6f5b99b24cbe9d2fab45d7d0506dde62d6f90f454da8c2400ceea"
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
    "f2": {
      "hidden": false,
      "default_condition": {
        "operator": "matches",
        "values": [
          null
        ],
        "modifier": null
      }
    },
    "f3": {
      "hidden": false,
      "default_condition": {
        "operator": "is",
        "values": [],
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