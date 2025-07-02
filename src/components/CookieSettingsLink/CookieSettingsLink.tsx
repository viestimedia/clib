import styles from './CookieSettingsLink.module.scss';

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    // eslint-disable-next-line no-unused-vars
    OneTrust: {
      ToggleInfoDisplay: () => void;
    };
    gravito: {
      cmp: {
        openPreferences: () => void;
      };
    };
  }
}
// Link behaviour is defined in Cookie Consent Script
export const CookieSettingsLink = () => {
  const isGravito = window.gravito !== undefined;
  if (isGravito) {
    return (
      <button
        id="settings"
        className={`${styles.link} gravitoCMP-standardCMP-secondary`}
        onClick={() => window.gravito.cmp.openPreferences()}
      >
        Evästeasetukset
      </button>
    );
  }
  return (
    <button
      id="ot-sdk-btn"
      className={`${styles.link} ot-sdk-show-settings`}
      onClick={() => window.OneTrust.ToggleInfoDisplay()}
    >
      Evästeasetukset
    </button>
  );
};
