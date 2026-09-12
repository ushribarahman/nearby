export const eventCategories = ["Music", "Food", "Technology", "Arts & Culture", "Education", "Business", "Sports", "Health & Wellness", "Community", "Entertainment", "Travel & Outdoors", "Other"];
export const offerCategories = ["Food & Dining", "Shopping", "Fashion", "Electronics", "Beauty & Wellness", "Travel & Hotels", "Entertainment", "Education", "Sports & Fitness", "Home & Living", "Services", "Other"];
export const formatAddress = address => [address.venue,address.area,address.division,address.country].map(value=>value?.trim()).filter(Boolean).join(", ");
