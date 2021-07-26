import Swal from 'sweetalert2';

/**
 * Default Alert to display user responses
 * @param {String} title
 * @param {String} text
 * @param {String} icontext
 */
export const Alert = (title, text, icon) => {
  Swal.fire({
    title,
    text,
    icon,
  });
};
