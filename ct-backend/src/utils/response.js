import StatusCodes from 'http-status-codes'

/**
 * Response Wrapper class.
 *
 * @export
 * @class Response
 */
export default class Response {
  /**
   * construct the response object and send the response
   *
   * @static
   * @param {Object} res The response object
   * @param {number} [code=STATUS.OK] The HTTP status code
   * @param {Object | null} [data={}] The actual data to send.
   * @param {string|Array} [message=] A descriptive message to send with the response.
   * @param {string} [status=OK] Set to OK for success response and ERROR for error responses
   * @memberOf Response
   * @returns {Object} response returned to client
   */
  static send(res, code = StatusCodes.OK, data, message, success = true) {
    res.status(code).json({
      success: success == null ? true : success,
      message: formatMesaage(message),
      data: data || null,
    })
  }
}

function formatMesaage(str) {
  if (!str) return "";

  // Make first letter capitial
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Export Module
module.exports = Response;