define([
	'./statesManager.js'
], function (statesManager) {
	class amoApi {
		static async getCompany(id) {
			try {
				return await (await fetch(`https://${statesManager.accountDomain()}.amocrm.ru/api/v4/companies/${id}`)).json()
			} catch {
				return null
			}
		}

		static async getContact(id) {
			try {
				return await (await fetch(`https://${statesManager.accountDomain()}.amocrm.ru/api/v4/contacts/${id}`)).json()
			} catch {
				return null
			}
		}

		static async getLead(id) {
			try {
				return await (await fetch(`https://${statesManager.accountDomain()}.amocrm.ru/api/v4/leads/${id}?with=companies,contacts`)).json()
			} catch {
				return null
			}
		}

		static async getCustomFields(entity) {
			try {
				return await (await fetch(`https://${statesManager.accountDomain()}.amocrm.ru/api/v4/${entity}/custom_fields`)).json()
			} catch {
				return null
			}
		}

		static async getPipelines() {
			try {
				return await (await fetch(`https://${statesManager.accountDomain()}.amocrm.ru/api/v4/leads/pipelines`)).json()
			} catch {
				return null
			}
		}

		static async getPipelineById(id) {
			try {
				return await (await fetch(`https://${statesManager.accountDomain()}.amocrm.ru/api/v4/leads/pipelines/${id}`)).json()
			} catch {
				return null
			}
		}

		static async getStatusById(pipelineId, id) {
			try {
				return await (await fetch(`https://${statesManager.accountDomain()}.amocrm.ru/api/v4/leads/pipelines/${pipelineId}/statuses/${id}`)).json()
			} catch {
				return null
			}
		}
	}

	return amoApi
})