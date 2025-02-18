export const notification = (toast, severity, summary, message) => {
  toast.add({
    severity: severity,
    summary: summary,
    detail: message,
    life: 3000,
  })
}
