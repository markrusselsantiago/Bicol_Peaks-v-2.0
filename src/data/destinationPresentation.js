const unsupportedDetail = /not (?:been )?(?:confirmed|verified|located|assigned|supported|established|available|documented)|limited published details|could not be confirmed|no reliable source|without stronger evidence|exact .*? not|unverified|unconfirmed|unknown|uncertain|requires confirmation|confirm (?:with|from)|should be confirmed/i;

export function getDestinationDescription(destination) {
  if (!/identified as a natural highland feature|existing destination record associates/i.test(destination.description)) {
    return destination.description;
  }

  const elevation = destination.elevation
    ? `At ${destination.elevation.replace(/^About\s+/i, 'about ')} above sea level,`
    : 'As a named highland landmark,';
  return `${destination.name} is a ${destination.type.toLowerCase()} in ${destination.province}, Bicol Region, Philippines. ${elevation} it contributes to the province's distinctive natural profile. The Bicol Region is known for its varied terrain, including mountain highlands and volcanic landscapes. This peak is one of the area's notable landforms and adds to the range of destinations visitors can explore across the region.`;
}

export function getDestinationLocation(destination) {
  return unsupportedDetail.test(destination.location || '')
    ? `${destination.province}, Bicol Region, Philippines.`
    : destination.location;
}

export function getDestinationStatus(destination) {
  if (!destination.volcanoStatus || /classification not confirmed/i.test(destination.volcanoStatus)) {
    return null;
  }

  if (/associated with Bulusan/i.test(destination.volcanoStatus)) {
    return 'Bulusan-associated feature';
  }

  return destination.volcanoStatus
    .replace(/\s*[—-]\s*confirm with PHIVOLCS/i, '')
    .replace(/;\s*no separate (?:volcano|alert) status/i, '');
}

export function getVerifiedDetail(value) {
  return value && !unsupportedDetail.test(value) ? value : null;
}
