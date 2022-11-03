export default function DatelistenForOutsideClicks(
    Datelistening,
    setDateListening,
    DatemenuRef,
    setDateActive,
  ) {
    return () => {
      if (Datelistening) return
      if (!DatemenuRef.current) return
      setDateListening(true)
      ;[`click`, `touchstart`].forEach((type) => {
        document.addEventListener(`click`, (evt) => {
          const cur = DatemenuRef.current
          const node = evt.target
          if (cur.contains(node)) return
          setDateActive(false)
        })
      })
    }
  }
  
  export const DevicelistenForOutsideClicks = (
    Devicelistening,
    setDeviceListening,
    DevicemenuRef,
    setDeviceActive,
  ) => {
    return () => {
      if (Devicelistening) return
      if (!DevicemenuRef.current) return
      setDeviceListening(true)
      ;[`click`, `touchstart`].forEach((type) => {
        document.addEventListener(`click`, (evt) => {
          const cur = DevicemenuRef.current
          const node = evt.target
          if (cur.contains(node)) return
          setDeviceActive(false)
        })
      })
    }
  }
  
  export const UserlistenForOutsideClicks = (
    Userlistening,
    setUserListening,
    UsermenuRef,
    setUserActive,
  ) => {
    return () => {
      if (Userlistening) return
      if (!UsermenuRef.current) return
      setUserListening(true)
      ;[`click`, `touchstart`].forEach((type) => {
        document.addEventListener(`click`, (evt) => {
          const cur = UsermenuRef.current
          const node = evt.target
          if (cur.contains(node)) return
          setUserActive(false)
        })
      })
    }
  }

  export const ApplicationlistenForOutsideClicks = (
    Applicationlistening,
    setApplicationListening,
    ApplicationmenuRef,
    setApplicationActive,
  ) => {
    return () => {
      if (Applicationlistening) return
      if (!ApplicationmenuRef.current) return
      setApplicationListening(true)
      ;[`click`, `touchstart`].forEach((type) => {
        document.addEventListener(`click`, (evt) => {
          const cur = ApplicationmenuRef.current
          const node = evt.target
          if (cur.contains(node)) return
          setApplicationActive(false)
        })
      })
    }
  }
  
  export const SessionslistenForOutsideClicks = (
    Sessionslistening,
    setSessionsListening,
    SessionsmenuRef,
    setSessionsActive,
  ) => {
    return () => {
      if (Sessionslistening) return
      if (!SessionsmenuRef.current) return
      setSessionsListening(true)
      ;[`click`, `touchstart`].forEach((type) => {
        document.addEventListener(`click`, (evt) => {
          const cur = SessionsmenuRef.current
          const node = evt.target
          if (cur.contains(node)) return
          setSessionsActive(false)
        })
      })
    }
  }