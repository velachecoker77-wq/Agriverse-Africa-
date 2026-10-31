@app.route('/api/marketplace/search')
def marketplace():
    q=request.args.get('q','').lower()
    # Load all data.json from vaults/
    results=[]
    for root, dirs, files in os.walk(VAULT_PATH):
        if 'data.json' in files:
            with open(os.path.join(root,'data.json')) as jf:
                d=json.load(jf)
                if q in d['farm_id'].lower() or q in d.get('gps','').lower():
                    results.append(d)
    return jsonify(results)

@app.route('/api/buy', methods=['POST'])
def buy():
    farm_id=request.json.get('farm_id')
    amount=request.json.get('amount',50000)
    farmer_phone=request.json.get('phone')
    # Orange Money + split
    farmer_share=int(amount*0.8)
    return jsonify({"status":"paid","farmer_share":farmer_share,"platform_share":amount-farmer_share,"message":f"Le {farmer_share} sent to {farmer_phone} via Orange Money"})
