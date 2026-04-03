import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksBestSellers extends Struct.ComponentSchema {
  collectionName: 'components_blocks_best_sellers';
  info: {
    displayName: 'Best Sellers';
  };
  attributes: {
    products: Schema.Attribute.Relation<'oneToMany', 'api::product.product'>;
    sectionTitle: Schema.Attribute.String;
    viewAllLink: Schema.Attribute.String;
    viewAllText: Schema.Attribute.String;
  };
}

export interface BlocksCollectionBanner extends Struct.ComponentSchema {
  collectionName: 'components_blocks_collection_banners';
  info: {
    displayName: 'Collection Banner';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    ctaLabel: Schema.Attribute.String;
    ctaUrl: Schema.Attribute.String;
  };
}

export interface BlocksCollectionSection extends Struct.ComponentSchema {
  collectionName: 'components_blocks_collection_sections';
  info: {
    displayName: 'Collection Section';
  };
  attributes: {
    collectionBanner: Schema.Attribute.Component<
      'blocks.collection-banner',
      true
    >;
    sectionTitle: Schema.Attribute.String;
  };
}

export interface BlocksFeaturedItem extends Struct.ComponentSchema {
  collectionName: 'components_blocks_featured_items';
  info: {
    displayName: 'Featured Item';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface BlocksFollowGrid extends Struct.ComponentSchema {
  collectionName: 'components_blocks_follow_grids';
  info: {
    displayName: 'Follow Grid';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    url: Schema.Attribute.String;
  };
}

export interface BlocksFollowSection extends Struct.ComponentSchema {
  collectionName: 'components_blocks_follow_sections';
  info: {
    displayName: 'Follow Section';
  };
  attributes: {
    followGrid: Schema.Attribute.Component<'blocks.follow-grid', true>;
    sectionTitle: Schema.Attribute.String;
  };
}

export interface BlocksHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_blocks_hero_sections';
  info: {
    displayName: 'Hero Section';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    ctaLabel: Schema.Attribute.String;
    ctaUrl: Schema.Attribute.String;
    textPosition: Schema.Attribute.Enumeration<['left', 'center', 'right']>;
    titleLine1: Schema.Attribute.String;
    titleLine2: Schema.Attribute.String;
  };
}

export interface BlocksMegamenuColumn extends Struct.ComponentSchema {
  collectionName: 'components_blocks_megamenu_columns';
  info: {
    displayName: 'Megamenu Column';
  };
  attributes: {
    columnTitle: Schema.Attribute.String;
    featuredItems: Schema.Attribute.Component<'blocks.featured-item', true>;
    links: Schema.Attribute.Component<'elements.menu-link', true>;
  };
}

export interface BlocksModiweekCard extends Struct.ComponentSchema {
  collectionName: 'components_blocks_modiweek_cards';
  info: {
    displayName: 'Modiweek Card';
  };
  attributes: {
    favoritesIcon: Schema.Attribute.Media<'images'>;
    image: Schema.Attribute.Media<'images'>;
    label: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface BlocksModiweekSection extends Struct.ComponentSchema {
  collectionName: 'components_blocks_modiweek_sections';
  info: {
    displayName: 'Modiweek Section';
  };
  attributes: {
    modiweekCards: Schema.Attribute.Component<'blocks.modiweek-card', true>;
    sectionTitle: Schema.Attribute.String;
  };
}

export interface BlocksSustainabilitySection extends Struct.ComponentSchema {
  collectionName: 'components_blocks_sustainability_sections';
  info: {
    displayName: 'Sustainability Section';
  };
  attributes: {
    ctaLabel: Schema.Attribute.String;
    ctaUrl: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface ElementsFooterNavLink extends Struct.ComponentSchema {
  collectionName: 'components_elements_footer_nav_links';
  info: {
    displayName: 'Footer Nav Link';
  };
  attributes: {
    label: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface ElementsFooterNavSection extends Struct.ComponentSchema {
  collectionName: 'components_elements_footer_nav_sections';
  info: {
    displayName: 'Footer Nav Section';
  };
  attributes: {
    navLinks: Schema.Attribute.Component<'elements.footer-nav-link', true>;
    title: Schema.Attribute.String;
  };
}

export interface ElementsFooterSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_elements_footer_social_links';
  info: {
    displayName: 'Footer Social Link';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images'>;
    platform: Schema.Attribute.Enumeration<
      ['instagram', 'facebook', 'pinterest', 'tiktok']
    >;
    url: Schema.Attribute.String;
  };
}

export interface ElementsHeaderIcons extends Struct.ComponentSchema {
  collectionName: 'components_elements_header_icons';
  info: {
    displayName: 'Header Icons';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images'>;
    iconName: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface ElementsMenuLink extends Struct.ComponentSchema {
  collectionName: 'components_elements_menu_links';
  info: {
    displayName: 'Menu Link';
  };
  attributes: {
    label: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface LayoutFooter extends Struct.ComponentSchema {
  collectionName: 'components_layout_footers';
  info: {
    displayName: 'Footer';
  };
  attributes: {
    copyrightIcon: Schema.Attribute.Media<'images'>;
    copyrightText: Schema.Attribute.String;
    footerNavigation: Schema.Attribute.Component<
      'elements.footer-nav-section',
      true
    >;
    newsletterPlaceholder: Schema.Attribute.String;
    newsLetterTermsText: Schema.Attribute.Text;
    newsletterTitle: Schema.Attribute.String;
    socialMediaLinks: Schema.Attribute.Component<
      'elements.footer-social-link',
      true
    >;
  };
}

export interface LayoutHeader extends Struct.ComponentSchema {
  collectionName: 'components_layout_headers';
  info: {
    displayName: 'Header';
  };
  attributes: {
    headerIcons: Schema.Attribute.Component<'elements.header-icons', true>;
    logoImage: Schema.Attribute.Media<'images'>;
    logoText: Schema.Attribute.String;
    topbarText: Schema.Attribute.String;
  };
}

export interface MenuMenuItemSection extends Struct.ComponentSchema {
  collectionName: 'components_menu_menu_item_sections';
  info: {
    displayName: 'MenuItemSection';
  };
  attributes: {
    hasSubItems: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    subItems: Schema.Attribute.Component<'menu.sub-items', true>;
    title: Schema.Attribute.String;
  };
}

export interface MenuMenuLink extends Struct.ComponentSchema {
  collectionName: 'components_menu_menu_links';
  info: {
    displayName: 'MenuLink';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface MenuSubItems extends Struct.ComponentSchema {
  collectionName: 'components_menu_sub_items';
  info: {
    displayName: 'subItems';
  };
  attributes: {
    MenuLinks: Schema.Attribute.Component<'menu.menu-link', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.best-sellers': BlocksBestSellers;
      'blocks.collection-banner': BlocksCollectionBanner;
      'blocks.collection-section': BlocksCollectionSection;
      'blocks.featured-item': BlocksFeaturedItem;
      'blocks.follow-grid': BlocksFollowGrid;
      'blocks.follow-section': BlocksFollowSection;
      'blocks.hero-section': BlocksHeroSection;
      'blocks.megamenu-column': BlocksMegamenuColumn;
      'blocks.modiweek-card': BlocksModiweekCard;
      'blocks.modiweek-section': BlocksModiweekSection;
      'blocks.sustainability-section': BlocksSustainabilitySection;
      'elements.footer-nav-link': ElementsFooterNavLink;
      'elements.footer-nav-section': ElementsFooterNavSection;
      'elements.footer-social-link': ElementsFooterSocialLink;
      'elements.header-icons': ElementsHeaderIcons;
      'elements.menu-link': ElementsMenuLink;
      'layout.footer': LayoutFooter;
      'layout.header': LayoutHeader;
      'menu.menu-item-section': MenuMenuItemSection;
      'menu.menu-link': MenuMenuLink;
      'menu.sub-items': MenuSubItems;
    }
  }
}
