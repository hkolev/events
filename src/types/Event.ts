export interface IEvent {
  type: string;
  id: number;
  datetime_utc: string;
  venue: Venue;
  datetime_tbd: boolean;
  performers: Performer[];
  is_open: boolean;
  links: [];
  datetime_local: Date;
  time_tbd: boolean;
  short_title: string;
  visible_until_utc: Date;
  stats: EventStats;
  taxonomies: Taxonomy[];
  url: string;
  score: number;
  announce_date: Date;
  created_at: Date;
  date_tbd: boolean;
  title: string;
  popularity: number;
  description: string;
  status: string;
  access_method: AccessMethod;
  event_promotion: null;
  announcements: unknown;
  conditional: boolean;
  enddatetime_utc: null;
  visible_at: string;
  is_visible_override: string;
  tdc_pvo_id: number;
  tdc_pv_id: number;
  themes: [];
  domain_information: [];
}

export interface AccessMethod {
  method: string;
  created_at: Date;
  employee_only: boolean;
}

export interface Performer {
  type: string;
  name: string;
  image: string;
  id: number;
  images: Images;
  divisions: null;
  has_upcoming_events: boolean;
  primary: boolean;
  stats: PerformerStats;
  taxonomies: Taxonomy[];
  image_attribution: string;
  url: string;
  score: number;
  slug: string;
  home_venue_id: null;
  short_name: string;
  num_upcoming_events: number;
  colors: null;
  image_license: string;
  popularity: number;
  location: null;
  image_rights_message: string;
}

export interface Images {
  huge: string;
}

export interface PerformerStats {
  event_count: number;
}

export interface Taxonomy {
  id: number;
  name: string;
  parent_id: null;
  document_source?: DocumentSource;
  rank: number;
}

export interface DocumentSource {
  source_type: string;
  generation_type: string;
}

export interface EventStats {
  listing_count: number;
  average_price: number;
  lowest_price_good_deals: number;
  lowest_price: number;
  highest_price: number;
  visible_listing_count: number;
  dq_bucket_counts: number[];
  median_price: number;
  lowest_sg_base_price: number;
  lowest_sg_base_price_good_deals: number;
}

export interface Venue {
  state: string;
  name_v2: string;
  postal_code: string;
  name: string;
  links: [];
  timezone: string;
  url: string;
  score: number;
  location: Location;
  address: string;
  country: string;
  has_upcoming_events: boolean;
  num_upcoming_events: number;
  city: string;
  slug: string;
  extended_address: string;
  id: number;
  popularity: number;
  access_method: AccessMethod;
  metro_code: number;
  capacity: number;
  display_location: string;
}

export interface Location {
  lat: number;
  lon: number;
}
