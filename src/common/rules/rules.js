export default {
    ruleRequired: (v, label = null) => {
      return !!v || `${label ?? 'Alan'} gerekli.`;
    },
    ruleMinLength: (v, length, label = null) => {
      return (
        String(v).length >= length ||
        `${label ?? 'Alan'} minimum ${length} karakter olmalı.`
      );
    },
    ruleMaxLength: (v, length, label = null) => {
      return (
        String(v).length <= length ||
        `${label ?? 'Alan'} maksimum ${length} karakter olmalı.`
      );
    },
};