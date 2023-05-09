import particlesConfig from './particles-config'
import { useCallback } from 'react'
import Particles from 'react-particles'
import { loadFull } from 'tsparticles'

const ParticlesBG = () => {
	const particlesInit = useCallback(async engine => {
		await loadFull(engine)
	}, [])

	const particlesLoaded = useCallback(async container => {}, [])
	return (
		<Particles
			id='tsparticles'
			init={particlesInit}
			loaded={particlesLoaded}
			options={particlesConfig}
		/>
	)
}

export default ParticlesBG
