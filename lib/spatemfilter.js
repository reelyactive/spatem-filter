/**
 * Copyright reelyActive 2025
 * We believe in an open Internet of Things
 */


/**
 * SpatemFilter Class
 * Maintain and apply filter parameters for spatems.
 */
class SpatemFilter {

  /**
   * SpatemFilter constructor
   * @param {Object} parameters The filter parameters.
   * @constructor
   */
  constructor(parameters) {
    parameters = parameters || {};

    if(parameters.hasOwnProperty('acceptedDeviceSignatures') &&
       Array.isArray(parameters.acceptedDeviceSignatures)) {
      this.acceptedDeviceSignatures = parameters.acceptedDeviceSignatures;
    }

    if(parameters.hasOwnProperty('acceptedDeviceIds') &&
       Array.isArray(parameters.acceptedDeviceIds)) {
      this.acceptedDeviceIds = parameters.acceptedDeviceIds;
    }

    if(parameters.hasOwnProperty('acceptedDeviceIdTypes') &&
       Array.isArray(parameters.acceptedDeviceIdTypes)) {
      this.acceptedDeviceIdTypes = parameters.acceptedDeviceIdTypes;
    }
  }

  /**
   * Does the filter observe an acceptedDeviceSignatures parameter?
   */
  get hasAcceptedDeviceSignatures() {
    return this.hasOwnProperty('acceptedDeviceSignatures');
  }

  /**
   * Does the filter observe an acceptedDeviceIds parameter?
   */
  get hasAcceptedDeviceIds() {
    return this.hasOwnProperty('acceptedDeviceIds');
  }

  /**
   * Does the filter observe an acceptedDeviceIdTypes parameter?
   */
  get hasAcceptedDeviceIdTypes() {
    return this.hasOwnProperty('acceptedDeviceIdTypes');
  }

  /**
   * Does the given spatem pass the filters?.
   * @param {Object} spatem The spatem to test against the filters.
   */
  isPassing(spatem) {
    if(this.hasAcceptedDeviceSignatures &&
       !testAcceptedDeviceSignatures(this, spatem)) {
      return false;
    }
    if(this.hasAcceptedDeviceIdTypes &&
       !testAcceptedDeviceIdTypes(this, spatem)) {
      return false;
    }
    if(this.hasAcceptedDeviceIds &&
       !testAcceptedDeviceIds(this, spatem)) {
      return false;
    }
    return true;
  }

}


/**
 * Test if the given spatem passes the given accepted deviceSignatures.
 * @param {SpatemFilter} instance The filter instance.
 * @param {Object} spatem The given spatem.
 */
function testAcceptedDeviceSignatures(instance, spatem) {
  let acceptedDeviceSignatures = instance.acceptedDeviceSignatures;
  let signature = spatem.deviceId + '/' + spatem.deviceIdType;

  return acceptedDeviceSignatures.includes(signature);
}


/**
 * Test if the given spatem passes the given accepted deviceIds.
 * @param {SpatemFilter} instance The filter instance.
 * @param {Object} spatem The given spatem.
 */
function testAcceptedDeviceIds(instance, spatem) {
  let acceptedDeviceIds = instance.acceptedDeviceIds;

  return acceptedDeviceIds.includes(spatem.deviceId);
}


/**
 * Test if the given spatem passes the given accepted deviceIdTypes.
 * @param {SpatemFilter} instance The filter instance.
 * @param {Object} spatem The given spatem.
 */
function testAcceptedDeviceIdTypes(instance, spatem) {
  let acceptedDeviceIdTypes = instance.acceptedDeviceIdTypes;

  return acceptedDeviceIdTypes.includes(spatem.deviceIdType);
}


module.exports = SpatemFilter;
