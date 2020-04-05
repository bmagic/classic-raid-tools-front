
import DruidTank from '../../../static/Abilities/Ability_Racial_BearForm.png'
import DruidCaC from '../../../static/Abilities/Ability_Druid_CatForm.png'
import DruidDD from '../../../static/Spells/Spell_Nature_StarFall.png'
import DruidHeal from '../../../static/Spells/Spell_Nature_HealingTouch.png'
import HuntDD from '../../../static/Weapons/INV_Weapon_Bow_07.png'
import MageDD from '../../../static/Weapons/INV_Wand_06.png'
import PriestDD from '../../../static/Spells/Spell_Shadow_ShadowWordPain.png'
import PriestHeal from '../../../static/Weapons/INV_Staff_30.png'
import RogueCaC from '../../../static/Weapons/INV_ThrowingKnife_04.png'
import ShamanCaC from '../../../static/Spells/Spell_Nature_LightningShield.png'
import ShamanDD from '../../../static/Spells/Spell_Nature_Lightning.png'
import ShamanHeal from '../../../static/Spells/Spell_Nature_HealingWaveGreater.png'
import WarlockDD from '../../../static/Spells/Spell_Nature_Drowsy.png'
import WarriorTank from '../../../static/Abilities/Ability_Warrior_DefensiveStance.png'
import WarriorCaC from '../../../static/Abilities/Ability_SteelMelee.png'

import Onyxia from '../../../static/Raids/wow_classic_logo_onyxia.png'
import MoltenCore from '../../../static/Raids/wow_classic_logo_molten_core.png'
import BlackwingLair from '../../../static/Raids/wow_classic_logo_blackwing_lair.png'
import ZulGurub from '../../../static/Raids/wow_classic_logo_zul_gurub.png'
import AhnQiraj from '../../../static/Raids/wow_classic_logo_ahn_qiraj.png'
import Naxxramas from '../../../static/Raids/wow_classic_logo_naxxramas.png'

export const wowClass = {
  druid:
    {
      tank: DruidTank,
      cac: DruidCaC,
      dd: DruidDD,
      heal: DruidHeal
    },
  hunt: {
    dd: HuntDD
  },
  mage: {
    dd: MageDD
  },
  priest: {
    dd: PriestDD,
    heal: PriestHeal
  },
  rogue: {
    cac: RogueCaC
  },
  shaman: {
    cac: ShamanCaC,
    dd: ShamanDD,
    heal: ShamanHeal
  },
  warlock: {
    dd: WarlockDD
  },
  warrior: {
    tank: WarriorTank,
    cac: WarriorCaC
  }
}

export const wowRaids = {
  onyxia: Onyxia,
  mc: MoltenCore,
  bwl: BlackwingLair,
  zg: ZulGurub,
  aq20: AhnQiraj,
  aq40: AhnQiraj,
  naxxramas: Naxxramas
}
