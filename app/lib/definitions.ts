export interface Damage {
	dice: string;
	type: string;
};

export interface WeaponProperty {
	name: string;
	description: string;
};

export interface Item {
	name: string;
	url: string;
	value: number;
};

export type MagicItem = {
    name: string;
    source: string;
    type?: string;
    rarity: Rarity;
    entries: Entries;
    baseItem?: string;
    reqAttune?: boolean | string;
    value: number;
};

export type ConsumableItem = {
    name: string;
    source: string;
    rarity: Rarity;
    entries: Entries;
    miscTags: string[];
    value: number;
};

export type MagicVariant = {
    name: string;
    type: string;
    rarity: Rarity;
    source: string;
    entries: Entries;
    value: number;
    reqAttune?: boolean | string;
};

export type MundaneItem = Item & {
	weight: string;
	type: string[];
	damage?: Damage;
	properties?: WeaponProperty[];
	ac?: string;
	stealth?: string;
	strength?: string;
};

export interface InputClasses {
	name: string;
	value: string;
};

export interface SpellSlot {
	level: string;
	quantity: number;
}
;
export interface SpellInterface {
  school: string;
  price: number;
  level: number;
  time: number;
};

export type Rarity = 'common' | 'uncommon' | 'rare' | 'very rare' | 'legendary';

export type EntryRecord = {
    type: 'entries';
    name: string;
    entries: Entries;
};

export type EntryList = {
    type: 'list';
    items: Array<string | EntryItem>;
}

export type EntryItem = {
    type: string;
    name: string;
    entry?: string;
    entries?: string[]
}

export type Entries = Array<string | EntryRecord | EntryList>

export interface ConsumableSet {
  rarity: Rarity;
  items: ConsumableItem[];
  label: string;
};

export interface WondrousSet {
  rarity: Rarity
  items: MagicItem[];
  label: string;
};

export interface MagicVariantSet {
  rarity: Rarity
  items: MagicVariant[];
  label: string;
};

export interface MundaneSet {
  rarity: Rarity
  items: MundaneItem[];
  label: string;
};

export type ItemTypes = MagicItem | ConsumableItem | MagicVariant | MundaneItem;
export type SetTypes = MundaneSet | WondrousSet  | ConsumableSet | MagicVariantSet;

export interface FilteringOptions {
  value: boolean;
  attunement?: boolean;
}

export interface PageFilter {
  minValue: number;
  maxValue: number;
  attunement?: number;
  reforge?: number;
}

export interface PlayerCharacter {
  name: string;
  level: number;
  tier: string;
  xp: number;
}

export interface CharacterList {
  [key: string]: PlayerCharacter;
}