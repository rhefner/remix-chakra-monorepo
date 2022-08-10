import React from 'react'
import { RemixBrowser } from '@remix-run/react'
import { RemixWrapper } from '@myorg/common-remix.client'
import { hydrateRoot } from 'react-dom/client'

requestIdleCallback(() => {
  React.startTransition(() => {
    hydrateRoot(
      document,
      <RemixWrapper>
        <RemixBrowser />
      </RemixWrapper>
    )
  })
})
