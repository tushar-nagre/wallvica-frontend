import { Alert, Button, CircularProgress, Stack } from '@mui/material'

export function ApiFeedback({ loading, error, retry }: { loading: boolean; error: boolean; retry: () => void }) {
  if (loading) return <Stack alignItems="center" py={8}><CircularProgress color="secondary" /></Stack>
  if (error) return <Alert severity="error" action={<Button color="inherit" size="small" onClick={retry}>Try again</Button>}>We couldn’t load this right now. Please check that the API is running.</Alert>
  return null
}
