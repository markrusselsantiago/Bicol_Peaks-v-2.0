const unsupportedDetail = /not (?:been )?(?:confirmed|verified|located|assigned|supported|established|available|documented)|limited published details|could not be confirmed|no reliable source|without stronger evidence|exact .*? not|unverified|unconfirmed|unknown|uncertain|requires confirmation|confirm (?:with|from)|should be confirmed/i;

export function getDestinationDescription(destination) {
  const isGenericDescription = /identified as a natural highland feature|existing destination record associates/i.test(destination.description);
  const elevation = destination.elevation
    ? `It rises to ${destination.elevation.replace(/^About\s+/i, 'about ')} above sea level.`
    : `It is one of the named highland landmarks of ${destination.province}.`;
  const firstParagraph = isGenericDescription
    ? `${destination.name} is a ${destination.type.toLowerCase()} in ${destination.province}, Bicol Region, Philippines. ${elevation} It is part of the province's varied natural landscape and contributes to the range of highland destinations found across the Bicol Region.`
    : destination.description;
  const location = getDestinationLocation(destination);
  const secondParagraph = `${location}${destination.elevation ? ` The recorded elevation is ${destination.elevation.toLowerCase()}.` : ''} This places ${destination.name} within ${destination.province}'s geographic landscape. Across Bicol, mountain highlands, volcanic landscapes, and lowland areas combine to create varied scenery from province to province.`;
  const history = getVerifiedDetail(destination.originHistory);
  const thirdParagraph = history
    || `The Bicol Peninsula's landscape has been shaped by tectonic activity, volcanism, weathering, and erosion over time. These regional processes have formed the varied highlands and landforms that make Bicol's natural geography distinctive.`;

  return [
    firstParagraph,
    secondParagraph,
    thirdParagraph
  ];
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
