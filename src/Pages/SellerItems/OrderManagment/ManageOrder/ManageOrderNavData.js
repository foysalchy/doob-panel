export const ordersNav = [
      {
            name: 'all',
            value: 'All',
            daraz_value: 'All',
            status: '',
            dropdownLink: [""],
      },
      {
            name: 'pending',
            status: '',
            value: 'pending',
            daraz_value: 'pending',
            woo_value: 'processing',
            dropdownLink: [
                  "all",
            ],
      },
      {
            name: 'Ready to ship',
            status: '',
            value: 'ready_to_ship',
            daraz_value: 'ready_to_ship',
            dropdownLink: [""],
      },
      {
            name: 'shipped',
            status: '',
            value: 'shipped',
            daraz_value: 'shipped',
            dropdownLink: [""],
      },
      {
            name: 'delivered',
            value: 'delivered',
            daraz_value: 'delivered',
            status: '',
            dropdownLink: [""],
      },
      {
            name: 'Cancel',
            status: '',
            value: 'Cancel',
            daraz_value: 'canceled',
            dropdownLink: [""],
      },
      {
            name: 'return request',
            status: '',
            value: 'return',
            daraz_value: 'return',
            dropdownLink: [""],
      },
      {
            name: 'returned',
            status: '',
            value: 'returned',
            daraz_value: 'returned',
            dropdownLink: [""],
      },
      {
            name: 'failed delivery',
            status: '',
            value: 'failed',
            daraz_value: 'failed',
            dropdownLink: [""],
      },
      {
            name: 'refund only',
            value: 'Refund',
            daraz_value: 'Refund',
            status: '',
            dropdownLink: [""],
      },
]


export const woo_order_nav = [
      {
            name: 'All',
            value: 'All',
            status: 'All',
      },
      {
            name: 'On hold',
            status: 'on-hold',
            value: 'on-hold',

      },
      {
            name: 'Processing',
            status: 'processing',
            value: 'processing',
      },
      {
            name: 'Completed',
            status: 'completed',
            value: 'completed',
      },
      {
            name: 'Cancelled',
            status: 'cancelled',
            value: 'cancelled',
      },
      {
            name: 'Refunded',
            status: 'refunded',
            value: 'refunded',
      },
      {
            name: 'Failed',
            status: 'failed',
            value: 'failed',
      }
]
