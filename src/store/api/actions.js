import {Parse} from 'parse'
export const createIncident = ({commit}, payload) => {
  const IncidentClass = Parse.Object.extend('Incident')
  const incident = new IncidentClass()
  return incident.save(payload)
}
