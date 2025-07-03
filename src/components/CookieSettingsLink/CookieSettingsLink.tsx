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
  // This will now evaluate to false on the server side, but it's ok
  const isGravito =
    typeof window !== 'undefined' && window.gravito !== undefined;
  const onClick = () => {
    if (isGravito) {
      window.gravito.cmp.openPreferences();
    } else {
      window.OneTrust.ToggleInfoDisplay();
    }
  };

  return (
    <button
      id="ot-sdk-btn"
      className={`${styles.link} ot-sdk-show-settings`}
      onClick={onClick}
    >
      Evästeasetukset
    </button>
  );
};
