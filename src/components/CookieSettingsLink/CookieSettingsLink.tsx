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
        tcf: {
          currentState: {
            purposes: {
              consent: Record<string, boolean>;
            };
          };
        };
      };
    };
  }
}
// Link behaviour is defined in Cookie Consent Script
export const CookieSettingsLink = () => {
  const windowDefined = typeof window !== 'undefined';
  // This will now evaluate to false on the server side, but it's ok
  const isGravito = windowDefined && window.gravito !== undefined;
  const onClick = () => {
    if (isGravito) {
      windowDefined && window.gravito.cmp.openPreferences();
    } else {
      windowDefined && window.OneTrust.ToggleInfoDisplay();
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
