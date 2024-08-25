// server/api/generate-iframe-token.js
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  const embed_code = "5cca4a8eba4e603e29808429"
  const secret_key = "f667376a6170447198c7684427fffe364731ad8c906f733e68559e0a6521034c7c3bb50b9a989c85932abdcee45368056479bfe63b3eedb93f9147ca34b3983c"
  const expired_time = Math.floor(Date.now() / 1000) + (24 * 60 * 60)

  const settings = {
    "enable_export_data": false,
    "default_timezone": null,
    "allow_to_change_timezone": false
  }

  const permissions = {
    "row_based": []
  }

  const filters = {
    "f1": {
      "hidden": false,
      "default_condition": {
        "operator": "is",
        "values": [],
        "modifier": null
      }
    },
    "f2": {
      "hidden": false,
      "default_condition": {
        "operator": "is",
        "values": [],
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
  }

  const payload = {
    settings,
    permissions,
    filters,
    exp: expired_time
  }

  const token = jwt.sign(payload, secret_key)

  return {
    embed_code,
    token
  }
})