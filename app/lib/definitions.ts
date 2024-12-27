export interface Source {
	initials?: string;
	name?: string;
	sigla?: string;
	nome?: string;
};

export interface Damage {
	dice: string;
	type: string;
};

export interface WeaponProperty {
	name: string;
	description: string;
};

export interface Item {
	id: number;
	name: string;
	url: string;
	value: number;
};

export type MagicItem = Item & {
	attunement?: string;
	description: string;
	rarity: string;
	reforge?: {
		type: string,
		text: string,
	};
	source: Source;
};

export type ConsumableItem = Item & {
	description: string;
	rarity: string;
	source: Source;
};

export type ArtificerInfusion = Item & {
	attunement?: string;
	description: string;
	level: number;
	source: Source;
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

export type RarityStrings = 'common' | 'uncommon' | 'rare'| 'veryrare' | 'legendary';

export interface ConsumableSet {
  rarity: RarityStrings;
  items: ConsumableItem[];
  label: string;
};

export interface WondrousSet {
  rarity: RarityStrings
  items: MagicItem[];
  label: string;
};

export interface InfusionSet {
  rarity: RarityStrings
  items: ArtificerInfusion[];
  label: string;
};

export interface MundaneSet {
  rarity: RarityStrings
  items: MundaneItem[];
  label: string;
};

export type ItemTypes = MagicItem | ConsumableItem | ArtificerInfusion | MundaneItem;
export type SetTypes = MundaneSet | WondrousSet  | ConsumableSet | InfusionSet;

export interface FilteringOptions {
  value: boolean;
  attunement?: boolean;
  reforge?: boolean;
}

export interface PageFilter {
  minValue: number;
  maxValue: number;
  attunement?: number;
  reforge?: number;
}