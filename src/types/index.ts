export type FilterType = 'dimension' | 'tag' | 'metric';

export interface Filter {
  type: FilterType;
  field: string;
  operator?: string;
  value: string | number;
}

export interface RowData {
    creative_id: string;
    creative_name: string;
    tags: string;
    country: string;
    ad_network: string;
    os: string;
    campaign: string;
    ad_group: string;
    ipm: string | number;
    ctr: string | number;
    spend: string | number;
    impressions: number;
    clicks: number;
    cpm: string | number;
    cost_per_click: string | number;
    cost_per_install: string | number;
    installs: number;
  }
  