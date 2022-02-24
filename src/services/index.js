const DEFAULT_DISEASE_VALUES = {
  DISTANCING: 0.6,
  TESTING_EFFORT: 0.1,
  INFECTION_RATE: 0.2,
  POPULATION: 1000000,
  MORTALITY_RATE: 0.069,
  ASYMPTOMATIC: 0.85,
  DELAY_R: 14,
  DELAY_Q: 3,
  VACCINE_RATE: 0.005,
  VACCINE_MAX: 0.9,
  VACCINE_EFFECTIVENESS: 0.85,
  DELAY_VACCINE: 240,
}

class DiseaseModel {
  constructor(values = DEFAULT_DISEASE_VALUES) {
    let {DISTANCING, TESTING_EFFORT, INFECTION_RATE, POPULATION, MORTALITY_RATE, ASYMPTOMATIC, DELAY_Q, DELAY_R, VACCINE_RATE, VACCINE_MAX, VACCINE_EFFECTIVENESS, DELAY_VACCINE} = values
    this.DISTANCING = DISTANCING ?? 0.6
    this.TESTING_EFFORT = TESTING_EFFORT ?? 0.1
    this.INFECTION_RATE = INFECTION_RATE ?? 0.2
    this.POPULATION = POPULATION ?? 1000000
    this.MORTALITY_RATE = MORTALITY_RATE ?? 0.069
    this.ASYMPTOMATIC = ASYMPTOMATIC ?? 0.85
    this.DELAY_R = DELAY_R ?? 14
    this.DELAY_Q =DELAY_Q ?? 3
    this.VACCINE_RATE = VACCINE_RATE ?? 0.005
    this.VACCINE_MAX = VACCINE_MAX ?? 0.9
    this.VACCINE_EFFECTIVENESS = VACCINE_EFFECTIVENESS ?? 0.85
    this.DELAY_VACCINE = DELAY_VACCINE ?? 240

    this.dT = 1
    this.num_infected = 1
    this.num_retrieved = 0
    this.num_vaccinated = 0
    this.time = 0

    this.x_values = [this.num_infected]
    this.new_infected = [this.num_infected]
    this.vaccinated_pop = [this.num_vaccinated]

    this.asymptomatic_list = [0]
    this.symptomatic_list = [1]
    this.dead_list = [0]

    this.times = [this.time]

    this.no_new_infection_count = 0
  }

  dXdt() {
    if (this.POPULATION - this.num_infected - (this.num_vaccinated * this.VACCINE_EFFECTIVENESS) < 0)
      return 0
    return (this.INFECTION_RATE * (1 - this.DISTANCING) * (this.num_infected - this.num_retrieved) * (this.POPULATION - this.num_infected - (this.num_vaccinated * this.VACCINE_EFFECTIVENESS)) / this.POPULATION) * this.dT
  }

  dRdt() {
    let delayed_q = this.time < this.DELAY_Q ? 0 : this.new_infected[this.x_values.length-parseInt(this.DELAY_Q/this.dT)]
    let delayed_r = this.time < this.DELAY_R ? 0 : this.new_infected[this.x_values.length-parseInt(this.DELAY_R/this.dT)]
    
    return (this.TESTING_EFFORT * delayed_q + (1 - this.TESTING_EFFORT) * delayed_r) * this.dT 
  }

  dVdt() {
    if (this.time < this.DELAY_VACCINE)
      return 0
    if (this.time > this.DELAY_VACCINE && this.num_vaccinated === 0)
      return 1
    return (this.VACCINE_RATE * this.num_vaccinated * (1 - this.num_vaccinated / (this.VACCINE_MAX * this.POPULATION))) * this.dT
  }

  dAdt(new_infections) {
    return this.ASYMPTOMATIC * new_infections * this.dT
  }

  dSdt(new_infections) {
    return (1 - this.ASYMPTOMATIC) * new_infections * this.dT
  }

  dDdt(new_infections) {
    return this.MORTALITY_RATE * (1 - this.ASYMPTOMATIC) * new_infections * this.dT
  }

  getData() {
    for (let i = 0; i < 10000; i++) {
      this.time += this.dT
    
      let new_inf = this.dXdt()
      if (new_inf < 0.00005) {
        this.no_new_infection_count += 1
      }
      else {
        this.no_new_infection_count = 0
      }
    
      this.num_infected += new_inf
      this.num_retrieved += this.dRdt()
      this.num_vaccinated += this.dVdt()
    
      this.x_values.push(this.num_infected)
      this.new_infected.push(new_inf)
      this.vaccinated_pop.push(this.num_vaccinated)
    
      this.asymptomatic_list.push(this.asymptomatic_list[this.asymptomatic_list.length-1] + this.dAdt(new_inf))
      this.symptomatic_list.push(this.symptomatic_list[this.symptomatic_list.length-1] + this.dSdt(new_inf))
      this.dead_list.push(this.dead_list[this.dead_list.length-1] + this.dDdt(new_inf))
    
      this.times.push(this.time)
    
      if (this.no_new_infection_count > 5) {
        break
      }
    }

    return {
      covidInfected: {
        times: this.times,
        values: this.x_values
      },
      newInfected: {
        times: this.times.slice(1, -1),
        values: this.new_infected
      },
      asymptomatic: {
        times: this.times,
        values: this.asymptomatic_list
      },
      symptomatic: {
        times: this.times,
        values: this.symptomatic_list
      },
      dead: {
        times: this.times,
        values: this.dead_list
      },
      vaccinated: {
        times: this.times,
        values: this.vaccinated_pop
      }
    }
  } 
}

export {
  DiseaseModel,
  DEFAULT_DISEASE_VALUES
}
